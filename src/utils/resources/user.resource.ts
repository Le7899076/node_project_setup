import User from '@interfaces/user.interfaces';

class UserResource {
    static transform(user: User): Record<string, any> {
        const { _id, firstName, lastName, email, password, createdAt, updatedAt } = user;

        return {
            id: _id,
            firstName,
            lastName,
            email,
            // password,
            createdAt,
            updatedAt,
        };
    }

    static collection(users: User[]): Record<string, any>[] {
        return users.map(UserResource.transform);
    }
}


export default UserResource;

