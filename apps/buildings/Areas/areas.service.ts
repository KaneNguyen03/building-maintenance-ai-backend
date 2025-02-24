import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-building';
import { CreateAreaDto } from '@app/contracts/areas/create-areas.dto';
import { UpdateAreaDto } from '@app/contracts/areas/update.areas';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AreasService {
private prisma = new PrismaClient();
  //constructor(private readonly prisma: PrismaClient) // Inject PrismaService

  // Create a new area
  async createArea(createAreaDto: CreateAreaDto) {
    try {
      const newArea = await this.prisma.area.create({
        data: {
          name: createAreaDto.name,
          description: createAreaDto.description,
        },
      });
      return {
        statusCode: 201,
        message: 'Area created successfully',
        data: newArea,
      };
    } catch (error) {
      throw new RpcException({
        statusCode: 400,
        message: 'Area creation failed',
      });
    }
  }

  // Get all areas
  async getAllAreas() {
    try {
      const areas = await this.prisma.area.findMany();
      return {
        statusCode: 200,
        message: 'Areas fetched successfully',
        data: areas,
      };
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Error retrieving areas',
      });
    }
  }

  // Get area by ID
  async getAreaById(areaId: string) {
    try {
      const area = await this.prisma.area.findUnique({
        where: { areaId },
      });
      if (!area) {
        return {
          statusCode: 404,
          message: 'Area not found',
        };
      }
      return {
        statusCode: 200,
        message: 'Area retrieved successfully',
        data: area,
      };
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Error retrieving area',
      });
    }
  }

  // Update area
  async updateArea(areaId: string, updateAreaDto: UpdateAreaDto) {
    try {
      const updatedArea = await this.prisma.area.update({
        where: { areaId },
        data: updateAreaDto,
      });
      return {
        statusCode: 200,
        message: 'Area updated successfully',
        data: updatedArea,
      };
    } catch (error) {
      throw new RpcException({
        statusCode: 400,
        message: 'Area update failed',
      });
    }
  }

  // Delete area
  async deleteArea(areaId: string) {
    try {
      await this.prisma.area.delete({
        where: { areaId },
      });
      return {
        statusCode: 200,
        message: 'Area deleted successfully',
      };
    } catch (error) {
      throw new RpcException({
        statusCode: 400,
        message: 'Area deletion failed',
      });
    }
  }
}
