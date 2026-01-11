/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SignInDto {
  /**
   * User email
   * @example "teste@gmail.com"
   */
  email: string;
  /**
   * User password
   * @example "123"
   */
  password: string;
}

export interface SignInRes {
  message: string;
}

export interface CreateNoteDto {
  /**
   * Title of the note
   * @example "15/11/1994"
   */
  title: string;
  /**
   * Content of the note
   * @example "This is a note example"
   */
  content: string;
}

export interface CreateNoteResponse {
  cod_note: number;
  cod_user: number;
  content: string;
  title: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  is_deleted: boolean;
  deleted_at: object;
}

export interface DeleteNoteDto {
  /**
   * cod_note to delete
   * @example 11
   */
  cod_note: number;
}

export interface DeleteNoteResponse {
  cod_note: number;
  cod_user: number;
  deleted_at: object;
}

export interface GetNoteResponse {
  title: string;
  content: string;
  /** @format date-time */
  create_at: string;
  cod_note: number;
  cod_user: number;
}

export interface UpdateNoteDto {
  /**
   * Title of the new note
   * @example "15/11/1994"
   */
  title: string;
  /**
   * Content of the new note
   * @example "This is a content example"
   */
  content: string;
  /**
   * cod_note of the new note
   * @example 100
   */
  cod_note: number;
}

export interface UpdateNoteResponse {
  message: string;
}

export interface GetPostResponse {
  cod_post: number;
  cod_user: number;
  content: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Swagger Api
 * @version 1.0
 * @contact
 *
 * Routes in my project
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  app = {
    /**
     * No description
     *
     * @tags App
     * @name AppControllerSayHelloWorld
     * @request GET:/app
     */
    appControllerSayHelloWorld: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/app`,
        method: "GET",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignIn
     * @summary Authenticate the user via rest
     * @request POST:/auth/signin
     */
    authControllerSignIn: (data: SignInDto, params: RequestParams = {}) =>
      this.request<SignInRes, any>({
        path: `/auth/signin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  note = {
    /**
     * No description
     *
     * @tags Note
     * @name NoteControllerCreateNote
     * @summary Used to create new notes
     * @request POST:/note
     */
    noteControllerCreateNote: (
      data: CreateNoteDto,
      params: RequestParams = {},
    ) =>
      this.request<CreateNoteResponse, any>({
        path: `/note`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Note
     * @name NoteControllerDeleteNote
     * @summary Used to delete a note
     * @request DELETE:/note
     */
    noteControllerDeleteNote: (
      data: DeleteNoteDto,
      params: RequestParams = {},
    ) =>
      this.request<DeleteNoteResponse, any>({
        path: `/note`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Note
     * @name NoteControllerGetNotes
     * @summary Used to get all notes
     * @request GET:/note
     */
    noteControllerGetNotes: (params: RequestParams = {}) =>
      this.request<GetNoteResponse[], any>({
        path: `/note`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Note
     * @name NoteControllerUpdateNote
     * @summary Used to edit a note
     * @request PUT:/note
     */
    noteControllerUpdateNote: (
      data: UpdateNoteDto,
      params: RequestParams = {},
    ) =>
      this.request<UpdateNoteResponse, any>({
        path: `/note`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  post = {
    /**
     * No description
     *
     * @tags Post
     * @name PostControllerGetPosts
     * @summary Get all the posts realated to one user
     * @request GET:/post
     */
    postControllerGetPosts: (params: RequestParams = {}) =>
      this.request<GetPostResponse[], any>({
        path: `/post`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
