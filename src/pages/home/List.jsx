import { useEffect, useState } from "react";
import point from "../../img/location.svg";
import ReactStars from "react-rating-stars-component";
import ReactPaginate from 'react-paginate';
import Geocode from "react-geocode";
import { Link } from "react-router-dom";


const List = ({jobList}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [location, setLocation] = useState();
    const [currentPosts, setCurrentPosts] = useState();

    const changePage = ({selected}) => {
        setCurrentPage(selected + 1);
        splitPost(selected + 1);
    };
    const splitPost = (pageIndex) => {
        const indexOfLastPost = (pageIndex || currentPage) * postsPerPage;
        const indexofFirstPost = indexOfLastPost - postsPerPage;
        setCurrentPosts(jobList.slice(indexofFirstPost, indexOfLastPost));
    }

    Geocode.setApiKey("YOUR_API_KEY");

    const getCountry = () => {
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
    useEffect(() => {
       if(jobList) {
           getCountry();
           splitPost();
        };
       
    }, [jobList]);
   
    if(!currentPosts) return null;
    
    return (
        <div>
            <section className="hero-section">
                <div>
                        <div className="container">
                            <div className="job-list-wraper">
                                {currentPosts.map((post, index) => (
                                <div className="job-holder" key={post.id}>
                                    <div className="job-list">
                                        <div className="content">
                                            <div className="img-holder">
                                                <img className="joblist-img" src={post.pictures[0]} alt="img" />
                                            </div>
                                            <div className="text-content">
                                                <Link to={`/${post.id}`} className="link">
                                                    <div className="title-holder">
                                                        <h2 className="job-title">{post.title}</h2>
                                                    </div>
                                                </Link>
                                                <p className="department-name">
                                                    Department name &#8226; {post.name}
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
                                                   new Date(post.updatedAt).getDate() + " " + new Date(post.updatedAt).toLocaleString('en-us', { month: 'long' })
                                                    + " " + new Date(post.updatedAt).getFullYear()
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
                </div>
            </section>
            
        </div>
    )
}

export default List;