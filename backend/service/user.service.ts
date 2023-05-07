import { User } from "../modals/user";
import bcrypt from 'bcrypt';
import { JobApplication } from "../modals/jobApplication";
import { EducationDetail } from "../modals/educationDetail";

export async function addJobApplication(body: any) {
    const jobData = await JobApplication.create({
        name: body.name,
        email: body.email,
        contactNumber: body.contactNumber
    });

    const educationDetail = await EducationDetail.create({
        name: body.name,
        university: body.university,
        year: body.year,
        cgpa: body.cgpa,
        jobApplicationId: jobData.id
    });

    return jobData;
}

export async function Login(body: any) {
    const registredUser = await User.findOne({
        where: {
            email: body.email,
        }
    });

    if (registredUser) {
        const currentPassword = registredUser.password;
        return body.password && currentPassword ? bcrypt.compareSync(body.password, currentPassword) : false;
    }
    return false;
}

export async function getJobApplication(condition: any) {
    return await JobApplication.findAll({
        where: condition
    });
}


export async function deleteJobApplication(userId: number) {
    return await JobApplication.destroy({ where: { id: userId } });
}

export async function getJobById(id: number) {
    return await JobApplication.findByPk(id);
}
