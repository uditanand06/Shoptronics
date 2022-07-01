import prisma from '../../../prisma/prisma'
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10)

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { name ,email, password } = data;

  if (
    !name||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }



    const existingUser = await prisma.user.findUnique({ where:{email} });

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');

  const result = await prisma.user.create({
    data:{
        email,
        name,
        password:hashedPassword,
    }
    })

  res.status(201).json({ message: 'Created user!' });
  
}

export default handler;