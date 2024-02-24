import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/star-wars.svg';

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const planetsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        if (!response.ok) {
          throw new Error('Error');
        }
        const data = await response.json();
        setPlanets(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(planets.length / planetsPerPage) && selectedPage !== page) {
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
        <div>
          <h1 className="md:text-5xl text-4xl italic font-extrabold mb-2 md:mt-0 mt-8 text-center">Star Wars Planets🌌</h1>
          <div className='p-6'>
          <h1 className='mb-5 font-extrabold text-2xl italic px-6'>Total Planets: {planets.length} 🌍</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
            {planets.slice((page - 1) * planetsPerPage, page * planetsPerPage).map((planet, index) => (
              <div key={index} className="card shadow-2xl rounded-2xl border border-black shadow-[#201658] transition duration-300 ease-in-out transform hover:scale-105">
                <div className='flex flex-col justify-between p-8'>
                  <h2 className="text-3xl font-extrabold italic mb-2 text-center p-1">{planet.name}</h2>
                  <div className='p-6 text-base'>
                    <p className='flex justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Climate: </span><span className='font-medium'>{planet.climate}</span></p>
                    <p className='flex justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Population: </span><span className='font-medium'>{planet.population}</span></p>
                    <p className='flex justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Diameter: </span><span className='font-medium'>{planet.diameter}</span></p>
                    <p className='flex whitespace-nowrap justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Gravity: </span><span className='font-medium'>{planet.gravity}</span></p>
                    <p className='flex whitespace-nowrap justify-stretch mb-1'><span className='font-bold mr-2 text-lg'>Terrain: </span><span className='font-medium'>{planet.terrain}</span></p>
                  </div>
                  <Link to={`/planets/${planet.name}/residents`} className='flex justify-center items-center px-8'>
                    <button className='btn-wide btn  bg-[#2f89b3] btn-accent text-white font-bold text-lg'>See Residents</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}
      {planets.length > 0 && (
        <div className="flex justify-center items-center mt-4">
          <button onClick={() => selectedPageHandler(page - 1)} className={`btn ${page > 1 ? "" : "hidden cursor-not-allowed"} mr-2 font-semibold text-base`} disabled={page <= 1}>Previous</button>
          {[...Array(Math.ceil(planets.length / planetsPerPage))].map((_, i) => (
            <button key={i + 1} onClick={() => selectedPageHandler(i + 1)} className={`btn ${page === i + 1 ? "bg-[#2f89b3] text-white" : "bg-gray-200 text-gray-700"} mx-1 font-semibold text-base`}>{i + 1}</button>
          ))}
          <button onClick={() => selectedPageHandler(page + 1)} className={`btn ${page < Math.ceil(planets.length / planetsPerPage) ? "" : "hidden cursor-not-allowed"} ml-2 font-semibold text-base`} disabled={page >= Math.ceil(planets.length / planetsPerPage)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Planets;
