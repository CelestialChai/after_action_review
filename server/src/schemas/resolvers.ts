import { AuthenticationError } from '../utils/auth.js';
import User, { UserRole } from '../models/User.js';
import Unit from '../models/Unit.js';
import Mission from '../models/Mission.js';

interface Context {
  user?: {
    _id: string;
    username: string;
    email: string;
    role: UserRole;
  } | null;
}

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user || !context.user._id) {
        console.log("❌ Authentication failed: User not logged in.");
        return null; // ✅ Instead of throwing an error, return null for better UX.
      }
      return await User.findById(context.user._id).populate('unit');
    },

    missions: async (_: any, __: any, context: Context) => {
      if (!context.user || !context.user._id) {
        console.log("❌ Unauthorized access: Must be logged in.");
        throw new AuthenticationError('❌ Must be logged in');
      }
      return await Mission.find({ user: context.user._id }).populate('unit');
    },
  },

  Mutation: {
    createMission: async (
      _: any,
      { input }: { input: { name: string; startDate: string; endDate: string; unitId?: string } },
      context: Context
    ) => {
      if (!context.user) {
        console.log("❌ Unauthorized: User must be logged in to create a mission.");
        throw new AuthenticationError("❌ Must be logged in to create a mission");
      }

      const mission = await Mission.create({
        ...input,
        user: context.user._id, // ✅ Assign mission to the user
      });

      if (input.unitId) {
        const unit = await Unit.findById(input.unitId);
        if (!unit) {
          throw new Error("❌ Unit not found");
        }
        unit.missions.push(mission._id);
        await unit.save();
        mission.unit = unit._id;
      }

      console.log(`✅ Mission created by ${context.user.username}:`, mission);
      return mission.populate(["unit", "user"]); // ✅ Populate the `user` field
    },


    deleteMission: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.user) {
        console.log("❌ Unauthorized: User must be logged in to delete a mission.");
        throw new AuthenticationError('❌ Must be logged in to delete a mission');
      }

      // ✅ Populate user field to check ownership
      const mission = await Mission.findById(id).populate('user');

      if (!mission) {
        console.log(`❌ Mission not found: ${id}`);
        throw new Error('❌ Mission not found');
      }

      // ✅ Ensure `user` exists before checking `_id`
      if (!mission.user || (mission.user as any)._id.toString() !== context.user._id) {
        console.log("❌ Unauthorized: User does not own this mission.");
        throw new AuthenticationError('❌ Cannot delete a mission you do not own');
      }

      await Mission.findByIdAndDelete(id);
      console.log(`✅ Mission deleted: ${id}`);
      return mission;
    },

  },
};

export default resolvers;