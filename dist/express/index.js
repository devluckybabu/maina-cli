import path from "path";
import pluralize from "pluralize-esm";
import { createDir, createFile } from "../method/index.js";
//create index file
export const createIndex = (outDir, model) => {
    let modelName = model.charAt(0).toLowerCase();
    modelName = modelName + model.slice(1);
    const full_path = createDir(path.join(outDir, pluralize(modelName)));
    const sIndex = `${full_path}\\[id].ts`;
    const indexFile = `${full_path}\\index.ts`;
    createFile(indexFile, `import { getError, prisma } from "../../api-handler";
import { MainaRequest, MainaResponse, generateId } from "../../api-handler";

///get data
export const GET = async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options = {} } = request;
    const data = await prisma.${modelName}.findMany(options);
    return res.json({ status: 'success', data });
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}


//add data
export const POST = async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options = {}, body: { data = [] } } = request;
    const promises = data.map((item: any) =>{
      const id = generateId('${modelName.slice(0, 4)}_', 30);
      const _data = Object.assign(item,{ id });
      return  prisma.${modelName}.create({ data: _data });
    });
    const result = await prisma.$transaction(promises);
    return res.json({ status: 'success', data: result });
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}


//update data 
export const PATCH = async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options = {}, body: { data = [] } } = request;
    const promises = data.map((item: any) => {
      const where = { id: String(item?.id) };
      return prisma.${modelName}.update({ data: item, where })
    });
    const result = await prisma.$transaction(promises);
    return res.json({ code: 200, status: 'success', data: result })
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}

//dalete data 
export const DEL = async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options = {}, body: { data = [] } } = request;
    const promises = data.map((id:string) => {
      return prisma.${modelName}.delete({ where: { id } });
    });
    const result = await prisma.$transaction(promises);
    return res.json({ code: 200, status: 'success', data: result })
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}
`);
    createFile(sIndex, `import { getError, prisma } from "../../api-handler";
import { MainaRequest, MainaResponse, generateId  } from "../../api-handler";


//fetch data
export const GET = async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options = {}, params: { id } } = request;
    const data = await prisma.${modelName}.findUnique({ where: { id } });
    return res.json({ status: 'success', data });
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}



//add data
export const POST = async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options = {}, body } = request;
    const id = generateId('${modelName.slice(0, 4)}_', 30);
    const _data = Object.assign(body,{ id });
    const result = await prisma.${modelName}.create({ data: _data });
    return res.json({ status: 'success', data: result });
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}


///update data
export const PATCH = async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options = {}, body, params: { id } } = request;
    const result = await prisma.${modelName}.update({ 
      data: body,
       where: { id }
    });
    return res.json({ status: 'success', data: result });
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}

//delete data
export const DEL = async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options = {}, params: { id } } = request;
    const result = await prisma.${modelName}.delete({ where: { id } });
    return res.json({ status: 'success', data: result });
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}
`);
};
export const createList = (outDir, model) => {
    let modelName = model.charAt(0).toLowerCase();
    modelName = modelName + model.slice(1);
    const full_path = createDir(path.join(outDir, pluralize(modelName)));
    const file = `${full_path}\\list.ts`;
    return createFile(file, `import { MainaRequest, MainaResponse } from "../../api-handler";
import { getError, paginateData, prisma } from "../../api-handler";

export default async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { query, options } = request;
    const { page = "1", limit = "50" } = query;
    const _page = Number(page);
    const _limit = Number(limit);
    const skip = (_page - 1) * _limit;
    const [count, result] = await prisma.$transaction([
      prisma.${modelName}.count({ where: options?.where }),
      prisma.${modelName}.findMany({ ...options, take: _limit, skip })
    ]);
    const data = paginateData(result, count, _page, _limit);
    return res.json({ status: 'success', data });
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}`);
};
export const createCount = (outDir, model) => {
    let modelName = model.charAt(0).toLowerCase();
    modelName = modelName + model.slice(1);
    const full_path = createDir(path.join(outDir, pluralize(modelName)));
    const file = `${full_path}\\count.ts`;
    createFile(file, `import { getError, prisma } from '../../api-handler';
import { MainaRequest, MainaResponse } from '../../api-handler';

export default async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options } = request;
    const data = await prisma.${modelName}.count(options);
    return res.json({ code: 200, status: 'success', data });
  } catch (error: any) {
    const _error = getError(error);
    return res.json(_error);
  }
}
`);
};
export const createGroup = (outDir, model) => {
    let modelName = model.charAt(0).toLowerCase();
    modelName = modelName + model.slice(1);
    const full_path = createDir(path.join(outDir, pluralize(modelName)));
    const file = `${full_path}\\group.ts`;
    createFile(file, `import { getError, prisma } from '../../api-handler';
import { MainaRequest, MainaResponse } from '../../api-handler';

export default async (request: MainaRequest, res: MainaResponse) => {
  try {
    const { options } = request;
    const data = await prisma.${modelName}.groupBy(options);
    return res.json({ code: 200, status: 'success', data });
  } catch (error: any) {
    const _error = getError(error);
    return res.json(_error);
  }
}
`);
};
