import { Request, Response} from 'express';
import { Link } from '../models/link';
import linksRepository from './../models/linksRepository';

function generateCode(total : number = 5) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < total; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function getLinks(request: Request, response: Response) {
  const results = await linksRepository.index();

  if (!results) return response.sendStatus(400);

  response.status(201).json(results);
}

async function postLink(request: Request, response: Response) {
  const link = request.body  as Link;
  link.code = generateCode();
  link.hits = 0;
  const result = await linksRepository.store(link);

  if (!result.id) return response.sendStatus(400);

  link.id = result.id;

  response.status(201).json(link);
}

async function getLink(request: Request, response: Response) {
  const code = request.params.code as string;
  const link = await linksRepository.findByCode(code);

  if (!link) {
    response.sendStatus(404);
  } else {
    response.status(200).json(link);
  }
}

async function hitLink(request: Request, response: Response) {
  const code = request.params.code as string;
  const link = await linksRepository.hit(code);

  if (!link) {
    response.sendStatus(404);
  } else {
    response.status(200).json(link);
  }
}

async function deleteLink(request: Request, response: Response) {
  const code = request.params.code as string;
  await linksRepository.destroy(code);

  response.sendStatus(200);
}

export default {
  postLink,
  getLink,
  hitLink,
  deleteLink,
  getLinks
}