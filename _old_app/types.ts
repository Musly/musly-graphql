import { Request, Response } from 'express';
import { Document, ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

// Globals

export type Parent = null | undefined

export interface Context {
  req: Request
  res: Response
}

// Entities

export type UserId = ObjectId
export type GroupId = ObjectId
export type GenreId = ObjectId
export type KeyId = ObjectId
export type ArtistId = ObjectId
export type PositionId = ObjectId
export type LineId = ObjectId
export type SectionId = ObjectId
export type CommentId = ObjectId
export type SongId = ObjectId
export type EventId = ObjectId

export interface AuthData extends JwtPayload {
  userId: UserId
  userEmail: string
}

export interface Dashboard {
  songCount: number
  genreCount: number
}

export interface Group extends Document {
  id: GroupId
  title: string
  type: string
  managerId: UserId
}

export interface User extends Document {
  id: UserId
  email: string
  emailVerified: boolean
  emailToken?: string
  firstName?: string
  lastName?: string
  displayName?: string
  password: string
  token?: string
  onboarded?: boolean
  groups?: Group[]
}

export interface Genre extends Document {
  id: GenreId
  title: string
  groupId: GroupId
}

export interface Key extends Document {
  id: KeyId
  title: string
  groupId: GroupId
}

export interface Artist extends Document {
  id: ArtistId
  title: string
  groupId: GroupId
}

export interface Position extends Document {
  id: PositionId
  title: string
  groupId: GroupId
  userId?: UserId
}

export interface Line extends Document {
  id: LineId
  sectionId: SectionId
  content: string
  type: string
}

export interface Section extends Document {
  id: SectionId
  title: string
  songId: SongId
}

export interface Comment extends Document {
  id: CommentId
  comment: string
  lineId: LineId
  userId: UserId
}

export interface Song extends Document {
  id: SongId
  groupId: GroupId
  title: string
  genreId: GenreId
  artistId: ArtistId
  keyId: KeyId
  duration?: number
}

export interface Attendee extends Document {
  email: string
  name?: string
  userId?: UserId
  optional: boolean
}

export interface Event extends Document {
  id: EventId
  groupId: GroupId
  creator: UserId
  attendees: Attendee[]
  subject: string
  startDateTime: number
  endDateTime: number
  description?: string
}
