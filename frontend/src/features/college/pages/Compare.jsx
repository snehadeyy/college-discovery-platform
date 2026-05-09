import { useEffect, useState } from "react";
import { useLocation } from "react-router"; // since you are using react-router
import { compareColleges } from "../services/colleges.api";

const CompareColleges = () => {
    const [colleges, setColleges] = useState([]);
    const location = useLocation();

    // ✅ SAFE access
    // const selectedIds = location.state?.ids || [];
    const selectedIds = Array.isArray(location.state?.ids)
        ? location.state.ids
        : [];

    useEffect(() => {
        const fetchCompare = async () => {
            try {
                const data = await compareColleges(selectedIds);
                setColleges(data); // ✅ FIXED (you forgot this earlier)
            } catch (err) {
                console.error(err);
            }
        };

        // ✅ SAFETY check
        if (Array.isArray(selectedIds) && selectedIds.length >= 2) {
            fetchCompare();
        }
    }, [selectedIds]);

    // ✅ Fallback UI (prevents crash)
    if (!Array.isArray(selectedIds) || selectedIds.length < 2) {
        return (
            <p className="text-center mt-10">
                Please select at least 2 colleges
            </p>
        );
    }

    if (colleges.length === 0) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-8">
                Compare Colleges
            </h1>

            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6 overflow-x-auto">
                <table className="w-full text-center border-collapse">

                    <thead>
                        <tr className="border-b">
                            <th className="p-3 text-left">Feature</th>
                            {colleges.map((c) => (
                                <th key={c.id} className="p-3">{c.name}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b">
                            <td className="p-3 font-medium text-left">Location</td>
                            {colleges.map((c) => (
                                <td key={c.id}>{c.location}</td>
                            ))}
                        </tr>

                        <tr className="border-b">
                            <td className="p-3 font-medium text-left">Fees</td>
                            {colleges.map((c) => (
                                <td key={c.id}>₹{c.fees}</td>
                            ))}
                        </tr>

                        <tr className="border-b">
                            <td className="p-3 font-medium text-left">Rating</td>
                            {colleges.map((c) => (
                                <td key={c.id}>⭐ {c.rating}</td>
                            ))}
                        </tr>

                        <tr>
                            <td className="p-3 font-medium text-left">Placement %</td>
                            {colleges.map((c) => (
                                <td key={c.id}>{c.placement_percentage}%</td>
                            ))}
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default CompareColleges;