import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/star-wars.svg'; 

const Residents = () => {
    const { name } = useParams();
    const [residents, setResidents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const residentsPerPage = 3;
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/planets?search=${name}`);
                if (!response.ok) {
                    throw new Error('Error fetching residents');
                }
                const data = await response.json();
                if (data.results.length > 0) {
                    const planet = data.results[0];
                    const residentUrls = planet.residents;
                    const residentsData = await Promise.all(
                        residentUrls.map(async (url) => {
                            const res = await fetch(url);
                            if (!res.ok) {
                                throw new Error('Error fetching resident details');
                            }
                            return res.json();
                        })
                    );
                    setResidents(residentsData);
                    setIsLoading(false);
                } else {
                    throw new Error('Planet not found');
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchResidents();
    }, [name]);

    const selectedPageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= Math.ceil(residents.length / residentsPerPage) && selectedPage !== page) {
            setPage(selectedPage);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center">
                    <img src={logo} alt='' width={400} height={400} />
                    <h1 className='text-4xl font-extrabold items-center justify-center mt-4'>Loading<span className="ml-2 loading loading-spinner loading-lg"></span></h1>
                </div>
            ) : (
                <>
                    {residents.length === 0 && (
                        <div className="flex flex-col justify-center items-center min-h-screen">
                            <div className="flex-col">
                                <img src={logo} alt='' width={400} height={400} />
                                <p className="text-center font-extrabold text-3xl mt-6">No residents in {name}!!</p>
                                <p className="text-center font-bold text-2xl mt-2">Please try again :)</p>
                            </div>
                        </div>
                    )}
                    {residents.length > 0 && (
                        <>
                            <h1 className="md:text-5xl text-4xl italic font-extrabold mb-2 md:mt-0 mt-8 text-center">{name} Residents 🚀</h1>
                            <div className='p-10'>
                            <h1 className='flex mb-4 font-extrabold text-2xl italic px-6 items-center'>
                                <span>Total Residents: {residents.length}</span>
                                <img src='https://em-content.zobj.net/source/apple/354/busts-in-silhouette_1f465.png' alt='' className='w-8 h-8 ml-2 mb-2' />  
                            </h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
                                {residents.slice((page - 1) * residentsPerPage, page * residentsPerPage).map((resident, index) => (
                                    <div key={index} className="card shadow-2xl rounded-2xl border border-black shadow-[#201658] transition duration-300 ease-in-out transform hover:scale-105">
                                        <div className='flex flex-col justify-between p-10'>
                                            <h2 className="text-3xl font-extrabold mb-2 text-center p-1">{resident.name}</h2>
                                            <div className='p-6 text-base'>
                                                <p className='flex justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Home World: </span><span className='font-medium'>{name}</span></p>
                                                <p className='flex justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Birth Year: </span><span className='font-medium'>{resident.birth_year}</span></p>
                                                <p className='flex justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Height: </span><span className='font-medium'>{resident.height}</span></p>
                                                <p className='flex justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Mass: </span><span className='font-medium'>{resident.mass}</span></p>
                                                <p className='flex justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Gender: </span><span className='font-medium'>{resident.gender}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-4">
                                <button onClick={() => selectedPageHandler(page - 1)} className={`btn ${page > 1 ? "" : "hidden cursor-not-allowed"} mr-2 font-semibold text-base`} disabled={page <= 1}>Previous</button>
                                {[...Array(Math.ceil(residents.length / residentsPerPage))].map((_, i) => (
                                    <button key={i + 1} onClick={() => selectedPageHandler(i + 1)} className={`btn ${page === i + 1 ? "bg-[#2f89b3] text-white" : "bg-gray-200 text-gray-700"} mx-1 font-semibold text-base`}>{i + 1}</button>
                                ))}
                                <button onClick={() => selectedPageHandler(page + 1)} className={`btn ${page < Math.ceil(residents.length / residentsPerPage) ? "" : "hidden cursor-not-allowed"} ml-2 font-semibold text-base`} disabled={page >= Math.ceil(residents.length / residentsPerPage)}>Next</button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Residents;
