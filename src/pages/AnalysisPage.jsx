import React from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

function AnalysisPage() {
    return (
        <div>
            <Webcam className="m-auto" />
            <Button className="button"> Analyze! </Button>
            

        </div>
    );
}

export default AnalysisPage;