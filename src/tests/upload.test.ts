import { UploadUsersUseCase } from "../app/usercase/uploadUsers"
import { userDto } from "../app/dtos/usersDtos";
import e, { Request, Response, response } from "express";
import { request } from "http";
import { UploadUserController } from "../app/controllers/uploadUserController";
import { StatusCodes } from "http-status-codes";

describe("uploadUserController", ()=> {
  let uploadUserController: UploadUserController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    uploadUserController = new UploadUserController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle missing file and return bad request error', async () => {
    await uploadUserController.handle(req as Request, res as Response);

    expect(res!.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res!.send).toHaveBeenCalledWith({ error: 'No file provided' });
  });

  it("should be able to create a new user", async ()=> {
    const uploadUser = new UploadUsersUseCase();
    const uploadData: userDto = {
      name: "testName",
      city: "tesrtCity",
      country: "testCountry",
      favorite_sport: "testSport",
    }

    const newUser = await uploadUser.execute(uploadData);
    expect(newUser).toHaveProperty("id");
  });

  
})