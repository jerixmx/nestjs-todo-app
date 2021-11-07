import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../users/entity/user.entity';

export class SeedUserRecord1636298071870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepo = queryRunner.manager.getRepository(UserEntity);
    const user = userRepo.create({
      username: 'seed',
      password: 'testing',
      email: '<a href="mailto://seed@test.com">seed@test.com</a>',
    });

    await userRepo.save(user);
  }

  // tslint:disable-next-line: no-empty
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
