import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import * as admin from 'firebase-admin';

admin.initializeApp();
const firestore = admin.firestore();
const collectionRef = firestore.collection('todos');

@Injectable()
export class TodosService {
  async create(createTodoDto: CreateTodoDto) {
    const docRef = await collectionRef.add({
      title: createTodoDto.title,
      body: createTodoDto.body,
    });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const newTodoData = {
      id: docRef.id,
      ...data,
    };

    return newTodoData;
  }

  async findAll() {
    const snapshot = await collectionRef.get();
    const todoList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return todoList;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
