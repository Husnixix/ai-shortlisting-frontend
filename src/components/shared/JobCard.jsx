import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";

function JobCard({ id, title, type, location }) {
    return (
        <div className="mt-4">
            <Link className="block" to={`/jobs/${id}`}>
                <Card className="bg-muted">  
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter className="gap-x-4">
                        <div className="flex items-center gap-x-2">
                            <Briefcase/>
                            <span>{type}</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <MapPin/>
                            <span>{location}</span>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    );
}

export default JobCard;
