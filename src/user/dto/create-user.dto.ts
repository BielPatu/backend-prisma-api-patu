export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    ToDoLists: Array<{ title: string }>;
    
}
