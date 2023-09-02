import { SetStateAction } from 'react';
import { UserInfo, Store, HotPlaceInfo, MessageType, AlarmType } from './types';

export interface EditorProps {
  body: string;
  setBody: React.Dispatch<SetStateAction<string>>;
}

// 스토어 지도 props
export interface StoreMapProps {
  storeLocation: string;
  title: string;
}

// 핫플레이스 props
export interface HotPlaceProps {
  setCategory: React.Dispatch<SetStateAction<string>>;
  setIsSelected: React.Dispatch<SetStateAction<HotPlaceInfo | undefined>>;
}

// 주변 지역 팝업스토어 props
export interface NearbyStoreProps {
  guName: string;
  setNearbyStoreMarker: React.Dispatch<SetStateAction<Store[] | undefined>>;
}

// 캘린더 props
export interface CalendarProps {
  storeData: Store;
}

export interface SearchCalendarProps {
  storeData: Store[] | null;
  onSearch: (startDate: Date, endDate: Date) => void;
}

export interface SearchModalProps {
  keyword: string;
  setKeyword: React.Dispatch<SetStateAction<string>>;
  searchModal: boolean;
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
  setId: React.Dispatch<SetStateAction<number>>;
  setTitle: React.Dispatch<SetStateAction<string>>;
  result: Store[] | null;
  setResult: React.Dispatch<SetStateAction<Store[] | null>>;
}

export interface SearchDefaultProps {
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
  setId: React.Dispatch<SetStateAction<number>>;
  setTitle: React.Dispatch<SetStateAction<string>>;
}

export interface WriteProps {
  setKeyword: React.Dispatch<SetStateAction<string>>;
  writeModal: boolean;
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
  storeId: number;
  storeTitle: string;
  setResult: React.Dispatch<SetStateAction<Store[] | null>>;
}

export interface CommentProps {
  postId: number;
}

export interface WriterProps {
  postId: number | undefined;
  writer: UserInfo | undefined;
}

export interface SubscribeProps {
  writerId: string | undefined;
}

export interface EditProps {
  postId: number;
  postBody: string;
  postTitle: string;
  isEdit: boolean;
  setIsEdit: React.Dispatch<SetStateAction<boolean>>;
}

export interface LoginProps {
  onClose: () => void;
  userInfo: UserInfo;
  setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
  closeModal: () => void;
}

export interface CardProps {
  store: Store;
}

export interface RecieveBoxProps {
  setReplyModal: React.Dispatch<SetStateAction<boolean | null>>;
  setSendMsgUser: React.Dispatch<SetStateAction<MessageType | null>>;
  toggleMsgBox: string;
}

export interface SendBoxProps {
  setReplyModal: React.Dispatch<SetStateAction<boolean | null>>;
  setSendMsgUser: React.Dispatch<SetStateAction<MessageType | null>>;
  toggleMsgBox: string;
}

export interface MessageProps {
  writer: UserInfo | undefined;
  msgModal: boolean;
  setMsgModal: React.Dispatch<SetStateAction<boolean>>;
}

export interface MsgDetailType {
  selectedMessage: MessageType | null;
  setIsClicked: React.Dispatch<SetStateAction<boolean>>;
  setReplyModal: React.Dispatch<SetStateAction<boolean | null>>;
  toggleMsgBox: string;
}

export interface MessageReplyProps {
  sendMsgUser: MessageType | null;
  setOpenReply: React.Dispatch<SetStateAction<boolean | null>>;
}

export interface AlarmBoxProps {
  alarms: AlarmType[];
}

export interface CommentCountProps {
  postId: number;
}
