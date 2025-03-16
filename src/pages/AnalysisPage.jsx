import React from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

function AnalysisPage() {
    
    function getFacialAnalysis() {
        fetch('http://localhost:3000/facialanalysis', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    return (
        <div>
            <Webcam className="m-auto max-w-[90%] h-auto" />
            <Button className="button" onClick={getFacialAnalysis}> Analyze! </Button>
        </div>
    );
}

export default AnalysisPage;
