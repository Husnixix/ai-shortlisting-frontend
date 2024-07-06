import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const AlertMessage = ({type, message}) => {
    let title, description, alertClass;
    
    switch(type) {
        case 'success':
            title = "Success";
            description = message;
            alertClass = "border-green-500 mt-2 mb-2 p-2";
            break;    
        case 'error':
            title = "Error";
            description = message;
            alertClass = "border-red-500 mt-2 mb-2 p-2";
            break;
        default:
            return null;
    }

  
    return (
        <div>
            <Alert className={alertClass}>
                <AlertTitle className={type === 'success' ? "text-green-400" : "text-red-400"}>
                {title}
                </AlertTitle>
                <AlertDescription>
                {description}
                </AlertDescription>
            </Alert>
        </div>
    );

    
      
}

export default AlertMessage;