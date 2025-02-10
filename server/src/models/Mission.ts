import { Schema, model, type Document } from 'mongoose';
import type { UnitDocument } from './Unit';
import type { UserDocument } from './User'; // ✅ Import UserDocument

export interface MissionDocument extends Document {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  unit: UnitDocument['_id'];
  user: UserDocument['_id']; // ✅ Add user reference
}

const missionSchema = new Schema<MissionDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: MissionDocument, endDate: Date) {
          return endDate >= this.startDate;
        },
        message: 'End date must be after or equal to start date',
      },
    },
    unit: {
      type: Schema.Types.ObjectId,
      ref: 'Unit',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // ✅ Reference the User model
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const Mission = model<MissionDocument>('Mission', missionSchema);
export default Mission;