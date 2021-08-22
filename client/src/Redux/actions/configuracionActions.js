import { apiAllStudents } from "../../api/api";

export const solicitarAllStudents = async( setState ) => {
    const {data} = await apiAllStudents();
    let { total } = data.pop();
    setState({ totalStudents: total, StudentsByGrado: data })
}