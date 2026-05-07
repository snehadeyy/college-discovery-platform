import { pool } from "../config/database.js";

/**
 * @name getColleges
 * @description searches and filters colleges
 * @access public
 */
const getColleges = async (req, res) => {
    try {
        const { search, location, maxFees, course } = req.query

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const offset = (page - 1) * limit;

        let query = `SELECT DISTINCT colleges.*
            FROM colleges
            LEFT JOIN courses
            ON colleges.id = courses.college_id
            WHERE 1=1`
        let values = []
        let index = 1

        if (search) {
            query += ` AND name ILIKE $${index}`
            values.push(`%${search}%`)
            index++
        }

        if (location) {
            query += ` AND location ILIKE $${index}`
            values.push(`%${location}%`)
            index++
        }

        if (maxFees) {
            query += ` AND fees <= $${index}`
            values.push(Number(maxFees))
            index++
        }

        if (course) {
            query += ` AND courses.course_name ILIKE $${index}`

            values.push(`%${course}%`)
            index++
        }

        query += ` ORDER BY colleges.rating DESC LIMIT $${index} OFFSET $${index + 1}`
        values.push(limit, offset)

        const data = await pool.query(query, values)

        return res.status(200).json({
            page,
            limit,
            result: data.rows
        })
    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }

}

/**
 * @name getCollegeByID
 * @description shows individual college details
 * @access public
 */

const getCollegeByID = async (req, res) => {
    try {
        const { id } = req.params

        const query = `
            SELECT 
                colleges.id,
                colleges.name,
                colleges.location,
                colleges.fees,
                colleges.rating,
                colleges.placement_percentage,
                courses.course_name
            FROM colleges
            LEFT JOIN courses
            ON colleges.id = courses.college_id
            WHERE colleges.id = $1
        `;

        const result = await pool.query(query, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "college not found"
            })
        }

        const college = {
            id: result.rows[0].id,
            name: result.rows[0].name,
            location: result.rows[0].location,
            fees: result.rows[0].fees,
            rating: result.rows[0].rating,
            placement_percentage: result.rows[0].placement_percentage,
            courses: []
        }

        result.rows.map(
            row => college.courses.push(row.course_name)
        )

        return res.status(200).json(college)
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

const compareColleges = async (req, res) => {
    try {
        const { ids } = req.body

        if (!ids || ids.length < 2) {
            return res.status(400).json({
                message: "select atleast 2 colleges"
            })
        }

        const query = `SELECT * FROM colleges WHERE id = ANY($1)`

        const result = await pool.query(query, [ids])

        return res.status(200).json(result.rows)
    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

export { getColleges, getCollegeByID, compareColleges }