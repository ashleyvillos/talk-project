import { METHODS } from "http";
import baseQueryAPI from "../base-api-query";
import { setUser } from "./slice";

interface User {
  id: number;
  name: string;
  username: number;
}

interface UserUpdate {
  id: number;
  user: User
}

export const apiSlice = baseQueryAPI.injectEndpoints({
  endpoints(builder) {
    return {
      fetchUsers: builder.query<User[], void> ({
        query:() =>  `/user`,
        onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;
            dispatch(setUser(data));
          } catch (error) {
            dispatch(setUser([]));
          }
        },
        providesTags: ['Users']
      }),
      fetchUsersById: builder.query<User, number | void> ({
        query:(id) =>  `/user/${id}`
      }),
      addUser: builder.mutation<any, User> ({
        query:(body) => ({
          url: '/user',
          method: 'post',
          body: body
        }),
        invalidatesTags: ['Users']
      }),
    }
  }
})

export const {useFetchUsersQuery, useFetchUsersByIdQuery, useLazyFetchUsersQuery, useLazyFetchUsersByIdQuery, useAddUserMutation} = apiSlice