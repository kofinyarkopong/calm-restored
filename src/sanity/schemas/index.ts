import { faq } from "./faq";
import { media, video } from "./media";
import { photo } from "./photo";
import { photographs } from "./photographs";
import { post } from "./post";
import { service } from "./service";
import { settings } from "./settings";

export const schemaTypes = [photo, video, settings, photographs, media, service, faq, post];
export const singletonTypes = new Set(["settings", "photographs", "media"]);
