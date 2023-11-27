const getSingleQueries = (modelName) => {
    let new_name = modelName.slice(1);
    let name = modelName.charAt(0).toLowerCase() + new_name;
    return `import prisma from "@src/prisma";
import { ApiRequest, ApiResponse, middleware, getError } from "@src/api-handler";

const handler = (req: ApiRequest, response: ApiResponse) => {
  return middleware(req, response, async (request: ApiRequest, res) => {
    try {
      const { query: { id } } = request;
      const where = { id: Number(id) }
      const data = await prisma.${name}.findUnique({ where });
      return res.json({ code: 200, status: "success", data });
    } catch (error) {
      const err = getError(error);
      return res.json(err);
    }
  });
}


export default handler;`.split('\n');
};
export default getSingleQueries;
