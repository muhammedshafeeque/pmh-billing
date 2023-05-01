import { createUser, getUserByUserId } from "../Service/Auth.service.js";
import {
  createProfile,
  getProfile,
  getProfileByUserId,
} from "../Service/Profile.service.js";
import {
  comparePassword,
  encriptString,
  generateToken,
} from "../Utils/utils.js";

export const makeProfile = async (req, res) => {
  try {
    let user = req.body;
    let userExist = await getUserByUserId(user.userName);
    if (userExist) {
      res.status(400).send("userName   Allready Exist");
    } else {
      let password = await encriptString(user.password);
      let User = await createUser({
        password,
        userName: user.userName,
      });
      await createProfile({
        userName:user.userName,
        userId: User._id,
      });
      res.send( 
        "Profile Created Successfully"
      );
    }
  } catch (error) {
    res.status(500).send("error:" + error);
  } 
};
export const doLogin = async (req, res) => {
  let userExist = await getUserByUserId(req.body.userName);
  if (userExist) {
    let compare = await comparePassword(req.body.password, userExist.password);
    if (compare) {
      let profile = await getProfileByUserId(userExist._id);
      let token = await generateToken(profile.userId);
      profile._doc.token=token
      res.send(profile);
    } else {
      res.status(400).send("Invalid userId Or Password");
    }
  } else {
    res.status(400).send("Invalid userId Or Password");
  }
};
export const getReqestUser=(req,res)=>{
  res.send(req.user)
}
