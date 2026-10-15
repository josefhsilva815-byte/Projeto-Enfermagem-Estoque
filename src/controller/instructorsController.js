import InstructorsRepository from "../repository/InstructorsRepository.js";

const instructorsRepository = new InstructorsRepository();

// Create
export async function newInstructor(req, reply) {
    try {
        const { nome, email, senha } = req.body;
        await instructorsRepository.addInstrutor({ nome, email, senha });
        return reply.code(200).send("Instrutor cadastrado com sucesso!");
    } catch (error) {
        return reply.code(400).send({ message: "CREATE INSTRUCTOR", error: error.message })
    }
}

// Read
export async function getAllInstructors(req, reply) {
    try {
        const data = await instructorsRepository.listAll();
        return reply.code(200).send(data);
    } catch (error) {
        return reply.code(400).send({ message: "GET ALL INSTRUCTORS", error: error.message })
    }
}
export async function getAllInstructorsOrderAsc(req, reply) {
    try {
        const data = await instructorsRepository.listAllInOrderAsc();
        return reply.code(200).send(data);
    } catch (error) {
        return reply.code(400).send({ message: "GET ALL INSTRUCTORS ORDER ASC", error: error.message })
    }
}
export async function getAllInstructorsOrderDesc(req, reply) {
    try {
        const data = await instructorsRepository.listAllInOrderDesc();
        return reply.code(200).send(data);
    } catch (error) {
        return reply.code(400).send({ message: "GET ALL INSTRUCTORS ORDER DESC", error: error.message })
    }
}
export async function getInstructorById(req, reply) {
    try {
        const { id } = req.params;
        const instructor = await instructorsRepository.searchById(id);
        return reply.code(200).send(instructor);
    } catch (error) {
        return reply.code(400).send({ message: "GET INSTRUCTOR BY ID", error: error.message })
    }
}
export async function getInstructorByName(req, reply) {
    try {
        const { nome } = req.params;
        const instructor = await instructorsRepository.searchByName(nome);
        return reply.code(200).send(instructor);
    } catch (error) {
        return reply.code(400).send({ message: "GET INSTRUCTOR BY NAME", error: error.message })
    }
}
export async function getInstructorByEmail(req, reply) {
    try {
        const { email } = req.params;
        const instructor = await instructorsRepository.searchByEmail(email);
        return reply.code(200).send(instructor);
    } catch (error) {
        return reply.code(400).send({ message: "GET INSTRUCTOR BY EMAIL", error: error.message })
    }
}

// Update
export async function updInstructor(req, reply) {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        await instructorsRepository.updateInstructor(id, { nome, email, senha });
        return reply.code(200).send("Instrutor atualizado com sucesso!")
    } catch (error) {
        return reply.code(400).send({ message: "UPDATE INSTRUCTOR", error: error.message })
    }
}

// Delete
export async function delInstructor(req, reply) {
    try {
        const { id } = req.params;
        await instructorsRepository.deleteInstructor(id);
        return reply.code(200).send("Instrutor excluído com sucesso!")
    } catch (error) {
        return reply.code(400).send({ message: "DELETE INSTRUCTOR", error: error.message })
    }
}