
declare interface ITodo {
  activity_group_id: number;
  id: number;
  is_active: number;
  priority: string;
  title: string;
  _comment: string
}

declare interface ITodoCreate extends Pick<ITodo, "activity_group_id" | "title" |  "_comment" | "priority"> { }
declare interface ITodoUpdate extends Pick<ITodo, "title" | "is_active" | "priority" | "_comment"> { }
