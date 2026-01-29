import User from "../lib/schema.js";
import Message from "../lib/messageSchema.js";



export const getSidebarUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    // 1️⃣ Get all messages involving current user
    const messages = await Message.find({
      $or: [{ senderId: currentUserId }, { receiverId: currentUserId }],
    });

    // 2️⃣ Extract unique user IDs (other than current user)
    const userIds = new Set();

    messages.forEach((msg) => {
      if (msg.senderId.toString() !== currentUserId) {
        userIds.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== currentUserId) {
        userIds.add(msg.receiverId.toString());
      }
    });

    // 3️⃣ Fetch users by those IDs
    const users = await User.find({
      _id: { $in: [...userIds] },
    }).select("name profilepic bio");

    res.status(200).json(users);
  } catch (error) {
    console.error("getSidebarUsers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesWithUser = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        {
          senderId: currentUser,
          recieverId: otherUserId,
        },
        {
          senderId: otherUserId,
          recieverId: currentUser,
        },
      ],
    }).sort({ createdAt: 1 });

    await Message.updateMany({
        senderId: otherUserId,
        recieverId: currentUser,
    },{ seen: true });

    res.status(200).json(messages);

  } catch (error) {
    console.error("getSidebarUsers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Mark message as seen
export const markMessageSeen=async (req,res)=>{
    try {
        const {id}= req.params;
        await Message.findByIdAndUpdate(id,{seen:true});
        res.status(200).json({message:"Message marked as seen"});

    } catch (error) {
        console.error("mark Message as seen",error);
        res.status(500).json({message:"Server error"});
    }
}


//SEnd messaage to a selected user
export const sendMessage = async (req,res) =>{
    try {
        const {text,image}=req.body;
        const receiverId = req.params.id;
        const senderId = req.user.id;
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image:imageUrl
        
          });

          res.status(201).json(newMessage);


    } catch (error) {
        console.error("mark Message as seen",error);
        res.status(500).json({message:"Server error"});
    }
}
