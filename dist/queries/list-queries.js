const listQueries = (modelName) => {
    let new_name = modelName.slice(1);
    let name = modelName.charAt(0).toLowerCase() + new_name;
    return `import prisma from "@src/prisma";
  import { ApiRequest, ApiResponse, middleware } from "@src/api-handler";
  import { getError, getSearchParams, paginateData } from "@src/api-handler";

const handler = (req: ApiRequest, response: ApiResponse) => {
  return middleware(req, response, async (request: ApiRequest, res) => {
    try {
      const { options, url } = request;
      const where = options?.where;
      const { page = "1", limit = "100" } = getSearchParams(url);
      const _page = Number(page);
      const _limit = Number(limit);
      const take = _limit;
      const skip = (_page - 1) * limit;
      const [count, result] = await prisma.$transaction([
        prisma.${name}.count({ where }),
        prisma.${name}.findMany({ ...options, take, skip })
      ]);
      const data = paginateData(result, count, _page, _limit);
      return res.json({ code: 200, status: "success", data });
    } catch (error) {
      const err = getError(error);
      return res.json(err);
    }
  });
}


export default handler;`.split('\n');
};
export default listQueries;
