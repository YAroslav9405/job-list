import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import React from 'react';



const Jobs = ({jobList}) => {
    const { id } = useParams();
    const [currentJob, setCurrentJob] = useState();

    useEffect(() => {
        if(jobList) {
            setCurrentJob(jobList.find(job => job.id === id));
        };
        
     }, [jobList]);

     if(!currentJob) return null;
    
    return(
        <div>
            <section className="job-details">
                    <div className="single-page-container">
                    <Link to="/" className="watch-link" >
                                            More info &#8594;
                                        </Link>
                        <p>{currentJob.address}</p>
                    </div>
            </section>
        </div>
    )
}

export default Jobs;