const User = require("../Models/users");

class AppointmentService{

    async Create(userData) {
    const { date, time } = userData;

    const exists = await User.findOne({ date, time });

    if (exists) {
      throw new Error("Horário já está ocupado. Por favor, escolha outro.");
    }

    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  }
    async FindAll(showAll) {
        if (showAll) {
            return await User.find(); 
        } else {
            return await User.find();
        }
    }
        async Delete(id) {
        try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
        }catch (error) {
        throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  }
  
}
module.exports= new AppointmentService();