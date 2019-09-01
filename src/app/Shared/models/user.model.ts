export class User {
    _id: string;
    fullName: string;
    email: string;
    phone?: number;
    contactPreference: string;
    skills: Skill[];
}
export class Skill {
    skillName: string;
    experienceInYears: number;
    proficiency: string;
}