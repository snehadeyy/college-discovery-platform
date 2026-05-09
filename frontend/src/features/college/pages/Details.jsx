import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDetails } from "../services/colleges.api";

const CollegeDetail = () => {
    const { id } = useParams();
    const [college, setCollege] = useState(null);
    const [activeTab, setActiveTab] = useState("courses");

    useEffect(() => {
        const fetchCollege = async () => {
            const res = await getDetails(id)
            // console.log(res)
            setCollege(res.data);
        };

        fetchCollege();
    }, [id]);

    if (!college) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            {/* OVERVIEW CARD */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">
                    {college.name}
                </h1>

                <p className="text-gray-500">{college.location}</p>

                <p className="mt-3 text-gray-600 leading-relaxed">
                    {college.name} is located in {college.location} and is known for its strong academic programs and excellent placement opportunities.
                    With an average fee of ₹{college.fees}, it maintains a rating of {college.rating} and offers a placement rate of {college.placement_percentage}%.
                    The institute provides a great learning environment wit h industry exposure and modern infrastructure.
                </p>

                <div className="flex gap-6 mt-4">
                    <p>💰 ₹{college.fees}</p>
                    <p>⭐ {college.rating}</p>
                    <p>📈 {college.placement_percentage}% placements</p>
                </div>
            </div>

            {/* TABS */}
            <div className="max-w-4xl mx-auto mt-6">
                <div className="flex gap-4 border-b pb-2">
                    <button
                        onClick={() => setActiveTab("courses")}
                        className={`px-4 py-2 rounded ${activeTab === "courses"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                            }`}
                    >
                        Courses
                    </button>

                    <button
                        onClick={() => setActiveTab("placements")}
                        className={`px-4 py-2 rounded ${activeTab === "placements"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                            }`}
                    >
                        Placements
                    </button>

                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`px-4 py-2 rounded ${activeTab === "reviews"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                            }`}
                    >
                        Reviews
                    </button>
                </div>

                {/* TAB CONTENT */}
                <div className="bg-white p-6 rounded-xl shadow mt-4">

                    {/* COURSES */}
                    {activeTab === "courses" && (
                        <div className="space-y-2">
                            <h1 className="text-xl font-medium">Best courses:</h1>
                            {college.courses?.length > 0 ? (
                                college.courses.map((course, i) => (
                                    <p key={i} className="border p-2 rounded bg-gray-50">
                                        {course}
                                    </p>
                                ))
                            ) : (
                                <p>No courses available</p>
                            )}
                        </div>
                    )}

                    {/* PLACEMENTS */}
                    {activeTab === "placements" && (
                        <div>
                            <p className="text-lg font-medium">
                                Placement Rate: {college.placement_percentage}%
                            </p>
                            <p className="text-gray-500 mt-2">
                                Top recruiters: Google, Amazon, Microsoft
                            </p>
                        </div>
                    )}

                    {/* REVIEWS */}
                    {activeTab === "reviews" && (
                        <div className="space-y-3">
                            <p className="bg-gray-50 p-3 rounded">
                                ⭐ Great campus and excellent placements
                            </p>
                            <p className="bg-gray-50 p-3 rounded">
                                ⭐ Faculty is helpful but exams are tough
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollegeDetail;