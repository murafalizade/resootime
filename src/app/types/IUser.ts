export default interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  location: string;
  restaurant_name: string;
  is_client: boolean;
}
