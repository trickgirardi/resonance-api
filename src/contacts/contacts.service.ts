import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from '../common/database/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  create(createContactDto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        ...createContactDto,
      },
    });
  }

  findAll() {
    return this.prisma.contact.findMany();
  }

  findOne(id: string) {
    return this.prisma.contact.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.prisma.contact.update({
      where: {
        id,
      },
      data: {
        ...updateContactDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }
}
