import { ApiProperty } from '@nestjs/swagger';
import {
  IsNonEmptyOptionalString,
  IsNonEmptyOptionalStringArray,
  IsNonEmptyString,
} from '../utils/class-validators';

export class CreateServiceDocRequest {
  @ApiProperty({
    description: 'Name of the service. Used as identifier.',
  })
  @IsNonEmptyString()
  name: string;

  @ApiProperty({
    description:
      'Name of the group. Used as identifier to match with group meta-data. Hierarchical groups separated by a dot, e.g. "group.sub-group.sub-sub-group"',
    required: false,
  })
  @IsNonEmptyOptionalString()
  group?: string;

  @ApiProperty({
    description: 'List of tags used to filter.',
    required: false,
  })
  @IsNonEmptyOptionalStringArray()
  tags?: string[];

  @ApiProperty({
    description: 'URL to code repository.',
    required: false,
  })
  @IsNonEmptyOptionalString()
  repository?: string;

  @ApiProperty({
    description: 'URL to task board.',
    required: false,
  })
  @IsNonEmptyOptionalString()
  taskBoard?: string;

  /** Dependencies */

  @ApiProperty({
    description:
      'List of consumed API identifiers. API identifier matched for dependency analysis.',
    required: false,
  })
  @IsNonEmptyOptionalStringArray()
  consumedAPIs?: string[];

  @ApiProperty({
    description:
      'List of provided API identifiers. API identifier matched for dependency analysis.',
    required: false,
  })
  @IsNonEmptyOptionalStringArray()
  providedAPIs?: string[];

  @ApiProperty({
    description:
      'List of produced event identifiers. Event identifier matched for dependency analysis.',
    required: false,
  })
  @IsNonEmptyOptionalStringArray()
  producedEvents?: string[];

  @ApiProperty({
    description:
      'List of consumed event identifiers. Event identifier matched for dependency analysis.',
    required: false,
  })
  @IsNonEmptyOptionalStringArray()
  consumedEvents?: string[];

  /** Documentation links */

  @ApiProperty({
    description: 'URL to development documentation.',
    required: false,
  })
  @IsNonEmptyOptionalString()
  developmentDocumentation?: string;

  @ApiProperty({
    description: 'URL to deployment documentation.',
    required: false,
  })
  @IsNonEmptyOptionalString()
  deploymentDocumentation?: string;

  @ApiProperty({
    description: 'URL to API documentation.',
    required: false,
  })
  @IsNonEmptyOptionalString()
  apiDocumentation?: string;

  /** Responsibilities */

  @ApiProperty({
    description:
      'Responsible team identifier. Used for matching multiple services to teams',
    required: false,
  })
  @IsNonEmptyOptionalString()
  responsibleTeam?: string;

  @ApiProperty({
    description: 'List of responsible person identifiers.',
    required: false,
  })
  @IsNonEmptyOptionalStringArray()
  responsibles?: string[];
}

export class CreateServiceDocResponse extends CreateServiceDocRequest {
  @ApiProperty()
  creationTimestamp: Date;

  @ApiProperty()
  updateTimestamp: Date;
}

export class GetServiceDocResponse extends CreateServiceDocResponse {}
export class DeleteServiceDocResponse extends GetServiceDocResponse {}

export class ListServiceDocResponse {
  @ApiProperty({
    type: [GetServiceDocResponse],
  })
  serviceDocs: GetServiceDocResponse[];
}
