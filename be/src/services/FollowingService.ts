// import { Repository } from "typeorm";
// import { Follows } from "../entities/Following";
// import { User } from "../entities/User";
// import { Request, Response } from "express";
// import { AppDataSource } from "../data-source";

// export default new (class FollowService {
//     private readonly followsRepository: Repository<Follows> = AppDataSource.getRepository(Follows);
//     private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

//     async followUser(req: Request, res: Response): Promise<Response> {
//         try {
//             const { followedUserId } = req.body;
//             const followerUserId = res.locals.loginSession.user.id;

//             // Ensure that followerUser and followedUser are defined
//             const followedUser = await this.userRepository.findOne(followedUserId);
//             const followerUser = await this.userRepository.findOne(followerUserId);

//             if (!followedUser || !followerUser) {
//                 return res.status(404).json({ message: "User not found" });
//             }

//             // Ensure that this.followsRepository is initialized
//             if (!this.followsRepository) {
//                 return res.status(500).json({ message: "Follows repository not initialized" });
//             }

//             // Check if the follow already exists
//             const existingFollow = await this.followsRepository.findOne({
//                 where: { follower: followerUser, followed: followedUser },
//             });

//             if (existingFollow) {
//                 return res.status(400).json({ message: "Already following this user" });
//             }

//             // Create and save the new follow
//             const newFollow = this.followsRepository.create({
//                 follower: followerUser,
//                 followed: followedUser,
//             });

//             await this.followsRepository.save(newFollow);

//             return res.status(200).json({ status: "success", message: "You have successfully followed the user.", data: { user_id: followedUserId, is_following: true } });
//         } catch (error) {
//             console.error("Error during followUser:", error.message);
//             return res.status(500).json({ message: "Failed to follow user" });
//         }
//     }

//     async unfollowUser(req: Request, res: Response): Promise<Response> {
//         try {
//             const { followedUserId } = req.body;
//             const followerUserId = res.locals.loginSession.user.id;

//             const followedUser = await this.userRepository.findOne(followedUserId);
//             const followerUser = await this.userRepository.findOne(followerUserId);

//             if (!followedUser || !followerUser) {
//                 return res.status(404).json({ message: "User not found" });
//             }

//             const existingFollow = await this.followsRepository.findOne({
//                 where: { follower: followerUser, followed: followedUser },
//                 relations: ["follower", "followed"],
//             });

//             if (!existingFollow) {
//                 return res.status(400).json({ message: "Not following this user" });
//             }

//             await this.followsRepository.remove(existingFollow);

//             return res.status(200).json({ status: "success", message: "You have successfully unfollowed the user.", data: { user_id: followedUserId, is_following: false } });
//         } catch (error) {
//             console.error("Error during unfollowUser:", error);
//             return res.status(500).json({ message: "Failed to unfollow user" });
//         }
//     }

//     async getFollowers(req: Request, res: Response): Promise<Response> {
//         try {
//             const userId = res.locals.loginSession.user.id;
//             const followers = await this.followsRepository.find({
//                 where: { followed: userId },
//                 relations: ["follower"],
//             });

//             const formattedFollowers = followers.map(follower => ({
//                 id: follower.follower.id,
//                 userName: follower.follower.userName,
//                 fullName: follower.follower.fullName,
//                 profil_picture: follower.follower.profil_picture,
//                 is_following: true,
//             }));

//             return res.status(200).json({ followers: formattedFollowers });
//         } catch (error) {
//             console.error("Error during getFollowers:", error);
//             return res.status(500).json({ message: "Failed to get followers" });
//         }
//     }

//     async getFollowing(req: Request, res: Response): Promise<Response> {
//         try {
//             const userId = res.locals.loginSession.user.id;
//             const following = await this.followsRepository.find({
//                 where: { follower: userId },
//                 relations: ["followed"],
//             });

//             const formattedFollowing = following.map(followed => ({
//                 id: followed.followed.id,
//                 userName: followed.followed.userName,
//                 fullName: followed.followed.fullName,
//                 profil_picture: followed.followed.profil_picture,
//             }));

//             return res.status(200).json({ following: formattedFollowing });
//         } catch (error) {
//             console.error("Error during getFollowing:", error);
//             return res.status(500).json({ message: "Failed to get following" });
//         }
//     }
// })();

import { Repository } from "typeorm";
import { Follows } from "../entities/Following";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

export default new (class FollowService {
  private readonly followsRepository: Repository<Follows>;
  private readonly userRepository: Repository<User>;

  constructor() {
      this.followsRepository = AppDataSource.getRepository(Follows);
      this.userRepository = AppDataSource.getRepository(User);
  }

    async followUser(req: Request, res: Response): Promise<Response> {
      try {
          // Memeriksa apakah pengguna telah login dan token telah disertakan
          if (!res.locals.loginSession) {
              return res.status(401).json({ message: "Unauthorized - login required" });
          }

          const { followerUserId } = req.body; // Perbaikan kunci di sini
          const followedUserId = res.locals.loginSession.user.id;

          // Melakukan pencarian pengguna yang akan diikuti dan pengguna yang melakukan tindakan follow
          const followedUser = await this.userRepository.findOne({where: {id: followerUserId}}); // Perbaikan kunci di sini
          const followerUser = await this.userRepository.findOne({where: {id: followedUserId}});

          // Memeriksa apakah kedua pengguna ditemukan
          if (!followedUser || !followerUser) {
              return res.status(404).json({ message: "User not found" });
          }

          // Memeriksa apakah pengguna sudah mengikuti pengguna yang dituju sebelumnya
          const existingFollow = await this.followsRepository.findOne({
              where: { 
                  follower: followerUser,
                  followed: followedUser,  
              },
          });

          if (existingFollow) {
              return res.status(400).json({ message: "Already following this user" });
          }

          // Membuat dan menyimpan follow baru
          const newFollow = this.followsRepository.create({
              follower: followerUser,
              followed: followedUser,
          });

          console.log("new follow", newFollow)
          await this.followsRepository.save(newFollow);

          return res.status(200).json({ status: "success", message: "You have successfully followed the user.", data: { user_id: followedUserId, is_following: true } }); // Perbaikan kunci di sini
      } catch (error) {
          console.error("Error during followUser:", error.message);
          return res.status(500).json({ message: "Failed to follow user" });
      }
  }

    async unfollowUser(req: Request, res: Response): Promise<Response> {
        try {
            const { followedUserId } = req.body;
            const followerUserId = res.locals.loginSession.user.id;

            const followedUser = await this.userRepository.findOne(followedUserId);
            const followerUser = await this.userRepository.findOne(followerUserId);

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

            await this.followsRepository.remove(existingFollow);

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
})();
