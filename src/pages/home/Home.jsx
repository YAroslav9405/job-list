import { useEffect, useState } from "react";
import point from "../../img/location.svg";
import ReactStars from "react-rating-stars-component";
import ReactPaginate from 'react-paginate';
import Geocode from "react-geocode";


const Home = () => {

    const [jobList, setJobList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [location, setLocation] = useState();
    const [active, setActive] = useState(false);

    const handleClick = () => {
      setActive(!active);
    };

    const request = async ()=> {
    const response = await fetch (`https://api.json-generator.com/templates/ZM1r0eic3XEy/data`,  {headers:{Authorization: "Bearer wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu"}} );
    const data = await response.json();
    console.log(data);
    setJobList(data);
    
    }
    useEffect(() => {
        request();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = jobList.slice(indexofFirstPost, indexOfLastPost);

    const changePage = ({selected}) => {
        setCurrentPage(selected + 1);
    };

    Geocode.setApiKey("AIzaSyB5msYIKZZ8SHMMBtD74EwBRQqhXJKzCVo");

    function getCountry() {
        const countryPromises = jobList.map(jobs => {

        return Geocode.fromLatLng(jobs.location.lat, jobs.location.long)
           
    })
        Promise.all(countryPromises).then(response => {
            const dataNew = response.map(data => {
              
            return data.results[0].address_components[1] ? data.results[0].address_components[1].long_name : "no location found";
            }
        )
            setLocation(dataNew);
        })
    }

   getCountry();

    return (
        <div>
            <section className="hero-section">
                <div>
                {jobList && (
                        <div className="container">
                            <div className="job-list-wraper">
                                {currentPosts.map((jobList, index) => (
                                <div className="job-holder" key={jobList.id}>
                                    <div className="job-list">
                                        <div className="content">
                                            <div className="img-holder">
                                                <img className="joblist-img" src={jobList.pictures[0]} alt="img" />
                                            </div>
                                            <div className="text-content">
                                                <div className="title-holder">
                                                    <h2 className="job-title">{jobList.title}</h2>
                                                </div>
                                                <p className="department-name">
                                                    Department name &#8226; {jobList.name}
                                                </p>
                                                <div className="location">
                                                    <img src={point} alt="point" className="loc-point" />
                                                    {location && location.length && <p className="city">
                                                        {location[(currentPage - 1)* 10 + index]}
                                                    </p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="other-wraper">
                                            <div className="stars-holder" >
                                                    <ReactStars classNames="new-stars"
                                                    size={18}
                                                    />
                                            </div>
                                            <div className="post-info">
                                                <input type="checkbox" />
                                                <p className="posted">{
                                                   new Date(jobList.updatedAt).getDate() + " " + new Date(jobList.updatedAt).toLocaleString('en-us', { month: 'long' })
                                                    + " " + new Date(jobList.updatedAt).getFullYear()
                                                }</p>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                                ))}
                            </div>
                            <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={changePage}
                            pageRangeDisplayed={5}
                            pageCount={18}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            marginPagesDisplayed={1}
                            containerClassName="pagination"
                            pageClassName="page-num"
                            activeLinkClassName="active"
                            nextLinkClassName="next-page"
                            previousLinkClassName="pre-page"
                            
                            />
                        </div>
                        
                )}
                </div>
            </section>
            
        </div>
    )
}

export default Home;