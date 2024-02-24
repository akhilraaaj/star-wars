/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <section className="flex items-center h-full p-16 dark:text-gray-100 min-h-screen">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl text-gray-800">404</h2>
			<p className="text-xl font-extrabold italic md:text-3xl text-red-700 whitespace-nowrap mb-4">Sorry, we couldn't find this page.</p>
			<Link to="/" className="btn-wide btn  bg-[#2f89b3] btn-accent text-white font-bold border border-blue-900 text-lg mt-4 mb-8">Back to Home Page</Link>
		</div>
	</div>
</section>
  )
}

export default Page404;