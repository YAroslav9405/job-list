import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import point from "../../img/location.svg";
import React from 'react';
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';



const Jobs = ({jobList}) => {
    const { id } = useParams();
    const [currentJob, setCurrentJob] = useState();

    const replace = () => {
        let sum = currentJob.salary.replace(/k/g, " 000");
        return sum
    };
    
    const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: "Your_api_key"
    });

    const mapCenter = () => {
        const center = {
            lat: +currentJob.location.lat,
            lng: +currentJob.location.long,
        };
        return center;
    }

      const [map, setMap] = React.useState(null)

      const mapStyle = {
        styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
          ]
      }

      
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    

    const text =() => {
        let textArr = currentJob.description.split(' ').splice(2, 38).join(' ');
        return textArr;
    }

    const responsabil =() => {
        let b= currentJob.description.split(' ').splice(41, 5).join(' ');
        return b;
    }

    const postedAt = () => {
       let postedDate = new Date(currentJob.updatedAt).getDate() + " " + new Date(currentJob.updatedAt).toLocaleString('en-us', { month: 'long' })
        + " " + new Date(currentJob.updatedAt).getFullYear();
        return postedDate 
    };

    useEffect(() => {
        if(jobList) {
            setCurrentJob(jobList.find(job => job.id === id));
        };
        
     }, [jobList]);

     if(!currentJob) return null;

    return(
        <div>
            <section className="job-details">
                    <div className="jobs-container">
                        <div className="job-wraper">
                            <div className="main-content">
                                <div className="jobs-details-wraper">
                                    <div className="title-holder">
                                        <h2 className="title">Job Details</h2>
                                    </div>
                                    <div className="icons-holder">
                                        <input type="checkbox" name="checkbox" id="checkbox"/>
                                        <label htmlFor="checkbox">Save to my list</label>
                                        <div className="icon-share"></div>
                                        <p className="text">Share</p>
                                    </div>
                                </div>
                                <div className="btn-holder">
                                    <button className="apply-btn">Apply now</button>
                                </div>
                                <div className="title-and-salary">
                                    <div className="job-title-holder">
                                        <h3 className="job-name">{currentJob.title}</h3>
                                    </div>
                                    <div className="salary-holder">
                                        <p className="salary-sum">&#8364; {replace()}</p>
                                        <p className="salary-text">Brutto, per year</p>
                                    </div>
                                </div>
                                <p className="posted">{postedAt()}</p>
                                <div className="job-description-wraper">
                                    <p className="job-description">{text()}</p>
                                    <p className="responsabil">{responsabil()}</p>
                                </div>
                                <div className="btn-holder new">
                                    <button className="apply-btn">Apply now</button>
                                </div>
                                <div className="additional-info-wraper">
                                    <div className="title-holder new">
                                        <h2 className="title new">Additional info</h2>
                                    </div>
                                    <p className="employment-benefits">Employment type</p>
                                    <div className="btn-empl-wraper">
                                        {currentJob.employment_type.map(empl => (
                                            <div className="btn-holder-empl" key={empl.id}>
                                                <button className="btn-empl">{empl}</button>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="employment-benefits">Benefits</p>
                                    <div className="btn-empl-wraper">
                                        {currentJob.benefits.map(benef => (
                                            <div className="btn-holder-empl yellow" key={benef.id}>
                                                <button className="btn-empl benef">{benef}</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="attached-images-wraper">
                                    <div className="title-holder new">
                                        <h2 className="title new">Attached images</h2>
                                    </div>
                                    <div className="images-wraper">
                                    {currentJob.pictures.map(attached => (
                                        <div className="attached-images-holder" key={attached.id}>
                                            <img className="attached-images" src={attached} alt="img" data-fancybox/>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                            <div className="map-content">
                                <div className="map-wraper">
                                    <div className="contact-info">
                                        <div className="department-name">
                                            <p className="contact-item">Department name.</p>
                                            <p className="contact-item">{currentJob.name}.</p>
                                        </div>
                                        <div className="department-name address">
                                            <img src={point} alt="point" className="loc-point" /> 
                                            {currentJob.address}
                                        </div>
                                        <div className="department-name address ">
                                            <p className="contact-item">{currentJob.phone},</p>
                                            <p className="contact-item">{currentJob.email}</p>
                                        </div>
                                    </div>
                                    <div className="contacts-wraper"></div>
                                    <span className="circle">
                                        <span className="white1"></span>
                                        <span className="white2"></span>
                                    </span>
                                    <div className="map">
                                        {
                                            isLoaded && (
                                                <GoogleMap
                                                  center={mapCenter()}
                                                  zoom={10}
                                                  onLoad={onLoad}
                                                  onUnmount={onUnmount}
                                                  defaultOptions={mapStyle}
                                                >
                                                    <Marker
                                                        position={{
                                                            lat: +currentJob.location.lat,
                                                            lng: +currentJob.location.long,
                                                        }}
                                                    >
                                                    </Marker>
                                                </GoogleMap>
                                            ) && <div className="error">Need  Maps Api Key</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to="/" className="back"> 
                            <span className="arrow">&#60;</span>
                            <a href="#" className="back-btn">return to job board</a>
                        </Link>
                    </div>
            </section>
        </div>
    )
}

export default Jobs;