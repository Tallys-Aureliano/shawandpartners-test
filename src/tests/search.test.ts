import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { SearchController, getUsers, searchUsers } from '../app/controllers/searchController';


describe('SearchController', () => {

  let searchController: SearchController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    searchController = new SearchController();
    req = { 
      query: { q: 'searchQuery' }};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle missing file and return bad request error', async () => {
    await searchController.handle(req as Request, res as Response);
    // const q:string = req.query.q as string;
    expect(res!.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    const search = await searchUsers(req.body);
    expect(search).toHaveLength(0);
  });
});
