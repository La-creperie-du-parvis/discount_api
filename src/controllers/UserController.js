import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    const id = jwt.decode(req.headers.authorization.split(" ")[1]).userId.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                nom: true,
                prenom: true,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
