import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUser, useSession } from "@clerk/clerk-react";
import AlertMessage from "../admin/components/alert/alert-message";

function JobPage() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const { isLoaded, isSignedIn, user } = useUser();
    const { session } = useSession(); 
    const [alertMessage, setAlertMessage] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        a1: "",
        a2: "",
        a3: ""
    });

    useEffect(() => {
        const fetchJob = async () => {
            if (id && isSignedIn && session) {
                console.log("Job ID from URL:", id);
                
                try {
                    const token = await session.getToken();
                    console.log("Retrieved token:", token);
                    
                    const response = await axios.get(`https://aidf-back-end-production.up.railway.app/jobs/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });     

                    setJob(response.data);
                    console.log(response.data);
                   
                } catch (err) {
                    console.error("Error fetching job:", err);
                }
            }
        };

        fetchJob();
    }, [id, isSignedIn, session]);

    const createJobApplication = async (jobApplication) => {
        try {
            const token = await session.getToken();
            const response = await fetch('https://aidf-back-end-production.up.railway.app/jobApplications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(jobApplication),
            });

            if (response.ok) {
                setAlertMessage({ type: 'success', message: 'Application Submitted' });
                console.log('Application Submitted');
            } else {
                setAlertMessage({ type: 'error', message: 'Failed to Submit' });
                console.error('Failed to Submit');
            }
        } catch (error) {
            setAlertMessage({ type: 'error', message: 'Application Submission Error' });
            console.error('Error:', error);
        }

        setTimeout(() => {
            setAlertMessage(null);
        }, 1000);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createJobApplication({
            fullName: user.fullName,
            answers: [formData.a1, formData.a2, formData.a3],
            job: id,
            userID: user.id
        });
    };

    if (!isLoaded) {
        return <div className="mt-3 animate-pulse" >Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to={"/sign-in"} />;
    }

    if (!job) {
        return <div className="mt-3 animate-pulse">Loading...</div>
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="mt-5">
            <div key={job._id}>
                <div className="bg-muted p-3 rounded shadow-sm">
                    <h1 className="font-semibold text-lg">{job.title}</h1>
                    <div className="py-4">
                        <p>{job.description}</p>
                    </div>
                    <div className="flex items-center gap-x-4 mt-4 mb-5">
                        <div className="flex items-center gap-x-2">
                            <Briefcase />
                            <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <MapPin />
                            <span>{job.location}</span>
                        </div>
                    </div>
                </div>
                
                <Separator />
                <div className="bg-muted mt-5 p-3 rounded">
                    <form action="" className="" onSubmit={handleSubmit}>
                        {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} />}
                        <div className="flex flex-col gap-y-4">
                            <Label>Full Name</Label>
                            <Input type="text" placeholder="" name="fullName" value={user.fullName} readOnly />
                        </div>
                        <div className="flex flex-col gap-y-4 mt-4">
                            <Label>Can you describe a recent project you worked on that required significant technical expertise? What technologies did you use, and what was your specific role in the project?</Label>
                            <Textarea type="textarea" placeholder="" name="a1" value={formData.a1} onChange={handleChange} required/>
                        </div>
                        <div className="flex flex-col gap-y-4 mt-4">
                            <Label>Tell us about a challenging problem you encountered in a previous role and how you approached solving it. What steps did you take, and what was the outcome?</Label>
                            <Textarea type="textarea" placeholder="" name="a2" value={formData.a2} onChange={handleChange} required/>
                        </div>
                        <div className="flex flex-col gap-y-4 mt-4">
                            <Label>Describe a time when you had to work closely with a team to achieve a common goal. How did you handle communication and collaboration, and what was the result of your teamwork?</Label>
                            <Textarea type="textarea" placeholder="" name="a3" value={formData.a3} onChange={handleChange} required/>
                        </div>
                        <Button type="submit" className="mt-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 w-full">Submit</Button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default JobPage;
