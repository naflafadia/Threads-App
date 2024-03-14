import { Repository } from "typeorm";
import { Follows } from "../entities/Following";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { log } from "console";

export default new (class FollowService {
  private readonly followsRepository: Repository<Follows>;
  private readonly userRepository: Repository<User>;

  constructor() {
      this.followsRepository = AppDataSource.getRepository(Follows);
      this.userRepository = AppDataSource.getRepository(User);
  }

    async followUser(req: Request, res: Response): Promise<Response> {
      try {

          if (!res.locals.loginSession) {
              return res.status(401).json({ message: "Unauthorized - login required" });
          }

          const { followedUserId } = req.body;
          const followerUserId = res.locals.loginSession.user.id;

          const followedUser = await this.userRepository.findOne({where: {id: followedUserId}}); 
          const followerUser = await this.userRepository.findOne({where: {id: followerUserId}});
          console.log(followedUser, "followeddd");
          console.log(followerUser, "followerrr");
          

          if (!followedUser || !followerUser) {
              return res.status(404).json({ message: "User not found" });
          }

          const existingFollow = await this.followsRepository.findOne({
              where: { 
                  follower: followerUser,
                  followed: followedUser,  
              },
          });
          console.log(existingFollow, "inii")

          if (existingFollow) {
              return res.status(400).json({ message: "Already following this user" });
          }

          const newFollow = this.followsRepository.create({
              follower: followerUser,
              followed: followedUser,
          });

          console.log("new follow", newFollow)
          await this.followsRepository.save(newFollow);

          return res.status(200).json({ status: "success", message: "You have successfully followed the user.", data: { user_id: followedUserId, is_following: true } });
      } catch (error) {
          console.error("Error during followUser:", error.message);
          return res.status(500).json({ message: "Failed to follow user" });
      }
  }

    async unfollowUser(req: Request, res: Response): Promise<Response> {
        try {
            const followedUserId  = parseInt(req.params.id, 10);
            const followerUserId = res.locals.loginSession.user.id;
            console.log(followedUserId, "userrrr");
            

            const followedUser = await this.userRepository.findOne({where: {id: followedUserId}});
            const followerUser = await this.userRepository.findOne({where: {id: followerUserId}});

            if (!followedUser || !followerUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const existingFollow = await this.followsRepository.findOne({
                where: { follower: followerUser, followed: followedUser },
                relations: ["follower", "followed"],
            });

            if (!existingFollow) {
                return res.status(400).json({ message: "Not following this user" });
            }

            await this.followsRepository.delete(existingFollow);

            return res.status(200).json({ status: "success", message: "You have successfully unfollowed the user.", data: { user_id: followedUserId, is_following: false } });
        } catch (error) {
            console.error("Error during unfollowUser:", error);
            return res.status(500).json({ message: "Failed to unfollow user" });
        }
    }

    async getFollowers(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.loginSession.user.id;
            const followers = await this.followsRepository.find({
                where: { followed: userId },
                relations: {follower: true},
            });

            // const formattedFollowers = followers.map(follower => ({
            //     id: follower.follower.id,
            //     userName: follower.follower.userName,
            //     fullName: follower.follower.fullName,
            //     profil_picture: follower.follower.profil_picture,
            //     is_following: true,
            // }));

            return res.status(200).json({ followers: followers });
        } catch (error) {
            console.error("Error during getFollowers:", error);
            return res.status(500).json({ message: "Failed to get followers" });
        }
    }

    async getFollowing(req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.loginSession.user.id;
            const following = await this.followsRepository.find({
                where: { follower: userId },
                relations: ["followed"],
            });

            const formattedFollowing = following.map(followed => ({
                id: followed.followed.id,
                userName: followed.followed.userName,
                fullName: followed.followed.fullName,
                profil_picture: followed.followed.profil_picture,
            }));

            return res.status(200).json({ following: formattedFollowing });
        } catch (error) {
            console.error("Error during getFollowing:", error);
            return res.status(500).json({ message: "Failed to get following" });
        }
    }

    async find(loginSession: any, queryType: string, queryLimit: number) : Promise<any> {
        try {
            let follows = Follows[0];

            if(queryType === "followings") {
                follows = await this.followsRepository.find({
                    take: queryLimit,
                    where: {
                        follower: {
                            id: loginSession.user.id
                        },
                    },
                    relations: ["followed"]
                })
                return follows.map((follow) => ({
                    id: follow.id,
                    user_id: follow.followed.id,
                    userName: follow.followed.userName,
                    fullName: follow.followed.fullName,
                    email: follow.followed.email,
                    profil_picture: follow.followed.profil_picture,
                    profil_description: follow.followed.profil_description,
                    is_followed: true
                }))
            } else if(queryType === "followers") {
                follows = await this.followsRepository.find({
                    take: queryLimit,
                    where: {
                        followed: {
                            id: loginSession.user.id
                        },
                    },
                    relations: ["follower"]
                })

                return Promise.all(
                    follows.map(async (data) => {
                        const isFollowed = await this.followsRepository.count({
                            where: {
                                followed: {
                                    id: data.follower.id
                                },
                                follower: {
                                    id: loginSession.user.id
                                }
                            }
                        })

                        return {
                            id: data.id,
                            user_id: data.follower.id,
                            userName: data.follower.userName,
                            fullName: data.follower.fullName,
                            email: data.follower.email,
                            profil_picture: data.follower.profile_picture,
                            profil_description: data.follower.profile_description,
                            is_followed: isFollowed > 0
                        }
                    })
                )
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
})();
