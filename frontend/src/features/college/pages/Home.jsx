import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getColleges } from "../services/colleges.api";

const Home = () => {
    const [colleges, setColleges] = useState([]);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [course, setCourse] = useState("");
    const [maxFees, setMaxFees] = useState("");
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState([]);

    const navigate = useNavigate()

    const fetchColleges = async () => {
        try {
            const data = await getColleges({
                search,
                location,
                course,
                maxFees,
                page,
                limit: 6
            });

            setColleges(data.result);

        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        fetchColleges();
    }, [search, location, course, maxFees, page]);

    const toggleSelect = (id) => {

        setSelected((prev) => {
            const current = Array.isArray(prev) ? prev : [];

            if (current.includes(id)) {
                return current.filter((item) => item !== id);
            }

            return [...current, id];
        });
    }

    return (
        <div className="min-h-screen bg-slate-100 font-sans">

            {/* HEADER */}
            <header className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-800">
                    Get admission in top colleges
                </h1>
                <p className="text-gray-500 mt-2">
                    Search top colleges by your choice
                </p>
            </header>

            {/* FILTER CARD */}
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md">

                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    College Discovery
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    <input
                        type="text"
                        placeholder="Search college..."
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Course"
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setCourse(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Max Fees"
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setMaxFees(e.target.value)}
                    />
                </div>

                {/* BUTTON */}
                <div className="mt-4 text-right">
                    <button
                        onClick={fetchColleges}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 active:bg-blue-700 transition"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* COLLEGE CARDS */}
            <div className="max-w-6xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(colleges) && colleges.map((college) => (
                    <div
                        key={college.id}
                        className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-lg font-semibold text-gray-800">
                            {college.name}
                        </h2>

                        <p className="text-gray-500 text-sm">{college.location}</p>

                        <div className="mt-2 space-y-1">
                            <p>💰 ₹{college.fees}</p>
                            <p>⭐ {college.rating}</p>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <button
                                className="text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
                                onClick={() => navigate(`/college/${college.id}`)}
                            >
                                View
                            </button>

                            <input
                                type="checkbox"
                                checked={Array.isArray(selected) && selected.includes(college.id)}
                                disabled={!selected.includes(college.id) && selected.length >= 3}
                                onChange={() => toggleSelect(college.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={selected.length < 2}
                    onClick={() => navigate("/compare", { state: { ids: selected } })}
                >
                    Compare
                </button>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center gap-4 mt-10 mb-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 active:bg-gray-400"
                >
                    Prev
                </button>

                <button
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-300 rounded active:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div >
    );
};

export default Home;