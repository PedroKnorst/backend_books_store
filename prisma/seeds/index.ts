import { makeCreateUserUseCase } from '#/modules/User/useCases/CreateUser';

export const generateSeeds = async () => {
  const user = await makeCreateUserUseCase().execute({
    email: 'marvel@gmail.com',
    name: 'Marvel',
    password: '12345',
    profile: 'SALESPERSON',
  });

  console.log(`User ${user.user.name} created`);
};

generateSeeds();
