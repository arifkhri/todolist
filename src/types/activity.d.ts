
declare interface IActivity {
  title: string;
  email: string;
}

declare interface IActivityCreate extends IActivity {
  _comment: string;
}

declare interface IActivityList {

}

declare interface IActivityDetail extends IActivity {
  created_at: string;
  id: number;
  todo_items: ITodo[]
}

