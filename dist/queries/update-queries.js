const updateQueries = (modelName) => {
    let new_name = modelName.slice(1);
    let name = modelName.charAt(0).toLowerCase() + new_name;
    return `import prisma from "@src/prisma";
import { ApiRequest, ApiResponse, getError, middleware } from "@src/api-handler";

const handler = (req: ApiRequest, response: ApiResponse) => {
  return middleware(req, response, async (request: ApiRequest, res) => {
    try {
      const { options, body: data } = request;
      const result = await prisma.${name}.updateMany({ ...options, data });
      return res.json({ code: 200, status: "success", data: result });
    } catch (error) {
      const err = getError(error);
      return res.json(err);
    }
  });
}


export default handler;`.split('\n');
};
export default updateQueries;
