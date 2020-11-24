import linkModel, { ILinkModel} from './linkModel';
import { Link } from './link';

async function index() {
  return await linkModel.findAll<ILinkModel>();
}

async function findByCode(code: string) {
  return await linkModel.findOne<ILinkModel>({ where: { code }});
}

async function store(link: Link) {
  return await linkModel.create<ILinkModel>(link);
}

async function hit(code: string) {
  const link = await findByCode(code);

  if (!link) return null;

  link.hits!++;
  await link.save();

  return link;
}

async function destroy(code: string) {
  const link = await findByCode(code);

  if (!link) return null;

  await link.destroy();

  return true;
}

export default {
  findByCode,
  store,
  hit,
  destroy,
  index
}