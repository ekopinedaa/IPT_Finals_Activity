const Users = require('../model/users')


const UserController = {
    CreateUser: async (req, res) => {
        try {
            const { userid, firstname, lastname, username, password, UserType } = req.body;

             if (!userid || !firstname || !lastname || !username || !password || !UserType) {
                 return res.status(400).json({ success: false, message: 'All required fields must be provided' });
             }

            const values = req.body

            await Users.create(values)
            res.json({ success: true, message: 'User added successfully!' })
        } catch (error) {
            res.json({ success: false, message: `Error adding user controller: ${error}` })
        }
    },
    FetchStudent: async (req, res) => {
        try {
          const { username } = req.params;
      
          const data = await Users.findOne({ username });
          if (!data) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
      
          const { userid, firstname, lastname, course, year, password } = data;
          res.json({ success: true, message: 'Fetching user successful', data: { userid, firstname, lastname, course, year, username, password } });
        } catch (error) {
          res.json({ success: false, message: `Error getting user controller: ${error}` });
        }
      },
    FetchAdmins: async (req, res) => {
        try {
            const admins = await Users.find({ UserType: 'admin' });

            const adminData = admins.map(admin => {
                const { userid, firstname, lastname, username, password, UserType } = admin;
                return { userid, firstname, lastname, username, password, UserType };
            });

            res.json({ success: true, message: 'Fetching admins successful', data: adminData });

        } catch (error) {
            res.json({ success: false, message: `Error getting admin users controller: ${error}` })
        }
    },
    FetchStudents: async (req, res) => {
        try {
            const students = await Users.find({ UserType: 'student' });

            const studentData = students.map(student => {
                const { userid, firstname, lastname, course, year, username, password, UserType } = student;
                return { userid, firstname, lastname, course, year, username, password, UserType };
            });

            res.json({ success: true, message: 'Fetching students successful', data: studentData });

        } catch (error) {
            res.json({ success: false, message: `Error getting student users controller: ${error}` })
        }
    },
    EditAdmin: async (req, res) => {
        try {
            const { userId } = req.params;
            const { firstname, lastname, username, password } = req.body;

            // Check if all required fields are provided
            if (!firstname || !lastname || !username || !password) {
                return res.status(400).json({ success: false, message: 'All required fields must be provided' });
            }

            // Find the user by userid and update their details
            const updatedAdmin = await Users.findOneAndUpdate(
                { userid: userId, UserType: 'admin' },
                { firstname, lastname, username, password },
                { new: true }
            );

            if (!updatedAdmin) {
                return res.status(404).json({ success: false, message: 'Admin not found' });
            }

            res.json({ success: true, message: 'Admin updated successfully', data: updatedAdmin });
        } catch (error) {
            res.json({ success: false, message: `Error updating admin: ${error}` });
        }
    },
    EditStudent: async (req, res) => {
        try {
            const { userId } = req.params;
            const { firstname, lastname, course, year, username, password } = req.body;

            // Check if all required fields are provided
            if (!firstname || !lastname || !course || !year || !username || !password) {
                return res.status(400).json({ success: false, message: 'All required fields must be provided' });
            }

            // Find the user by userid and update their details
            const updatedStudent = await Users.findOneAndUpdate(
                { userid: userId, UserType: 'student' },
                { firstname, lastname, course, year, username, password },
                { new: true }
            );

            if (!updatedStudent) {
                return res.status(404).json({ success: false, message: 'Student not found' });
            }

            res.json({ success: true, message: 'Student updated successfully', data: updatedStudent });
        } catch (error) {
            res.json({ success: false, message: `Error updating student: ${error}` });
        }
    },
    Login: async (req, res) => {
        try {
          const { username, password } = req.body;
    
          if (!username || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
          }
    
          const user = await Users.findOne({ username, password });
    
          if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
          }
    
          const redirectUrl = user.UserType === 'admin' ? '/ManageUsers' : '/StudentForm';
    
          res.json({ success: true, message: 'Login successful', redirectUrl });
        } catch (error) {
          res.status(500).json({ success: false, message: `Error during login: ${error.message}` });
        }
      }
}

module.exports = UserController